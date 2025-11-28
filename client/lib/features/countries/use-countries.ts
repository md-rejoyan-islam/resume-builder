"use client";

import { useEffect, useState } from "react";

export interface Country {
  name: string;
  code: string;
}

interface CountryApiResponse {
  name: { common: string };
  cca2: string;
}

interface UseCountriesResult {
  countries: Country[];
  isLoading: boolean;
  error: Error | null;
}

// Cache countries data to avoid refetching
let cachedCountries: Country[] | null = null;
let fetchPromise: Promise<Country[]> | null = null;

async function fetchCountriesData(): Promise<Country[]> {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca2"
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }

  const data: CountryApiResponse[] = await response.json();
  return data
    .map((c) => ({ name: c.name.common, code: c.cca2 }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function useCountries(): UseCountriesResult {
  // Initialize state from cache if available
  const [countries, setCountries] = useState<Country[]>(
    () => cachedCountries || []
  );
  const [isLoading, setIsLoading] = useState(() => !cachedCountries);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If already cached, state is already initialized correctly - no action needed
    if (cachedCountries) {
      return;
    }

    // Track if component is still mounted
    let isMounted = true;

    // If a fetch is already in progress, wait for it
    if (fetchPromise) {
      fetchPromise
        .then((data) => {
          if (isMounted) {
            setCountries(data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(err);
            setIsLoading(false);
          }
        });
      return () => {
        isMounted = false;
      };
    }

    // Start a new fetch
    fetchPromise = fetchCountriesData();

    fetchPromise
      .then((data) => {
        cachedCountries = data;
        if (isMounted) {
          setCountries(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
        fetchPromise = null; // Reset on error to allow retry
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { countries, isLoading, error };
}
