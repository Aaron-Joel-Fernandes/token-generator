package com.arikolabs.generator;

public class GeneratorHelper {

    private static long factorial(int n) {
        if (n == 0 || n == 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }

    // Calculate n choose r (nCr)
    public static long calculateCombinations(int n, int r) {
        if (n < 0 || r < 0 || r > n) {
            throw new IllegalArgumentException("Invalid input. n and r must be non-negative, and r must be less than or equal to n.");
        }

        long numerator = factorial(n);
        long denominator = factorial(r) * factorial(n - r);

        return numerator / denominator;
    }
}
