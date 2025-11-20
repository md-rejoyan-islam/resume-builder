import TenantModel from '../modules/tenant/tenant.model';

/**
 * Generates a unique tenant name based on user's first name and last name
 * Ensures uniqueness by appending a timestamp or random suffix if needed
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns A unique tenant name
 */
export async function generateTenantName(
  firstName: string,
  lastName: string,
): Promise<string> {
  // Create base tenant name from first and last name
  const baseName = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Remove special characters

  // Check if base name is available
  const exists = await TenantModel.findOne({ name: baseName }).lean();
  if (!exists) {
    return baseName;
  }

  // If not available, try with timestamp suffix
  const timestamp = Date.now();
  const nameWithTimestamp = `${baseName}-${timestamp}`;

  const existsWithTimestamp = await TenantModel.findOne({
    name: nameWithTimestamp,
  }).lean();

  if (!existsWithTimestamp) {
    return nameWithTimestamp;
  }

  // If still not unique (highly unlikely), add random suffix
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${baseName}-${randomSuffix}`;
}
