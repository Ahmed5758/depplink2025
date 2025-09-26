// app/_ctx/ClientDataRegistry.tsx
"use client";
import React, { createContext, useContext, useMemo } from "react";

type Registry = Record<string, unknown>;
const RegistryCtx = createContext<Registry>({});

// Merges data from nested layouts (parent→child)
export function ClientDataRegistry({
    value,
    children,
}: {
    value?: Registry;
    children: React.ReactNode;
}) {
    const parent = useContext(RegistryCtx);
    const merged = useMemo(() => ({ ...parent, ...(value ?? {}) }), [parent, value]);
    return <RegistryCtx.Provider value={merged}>{children}</RegistryCtx.Provider>;
}

// Convenience: drop a single value into a named slot
export function BridgeSlot<T>({
    slot,
    value,
    children,
}: {
    slot: string;
    value: T;
    children: React.ReactNode;
}) {
    return <ClientDataRegistry value={{ [slot]: value }}>{children}</ClientDataRegistry>;
}

// Read a value by slot name
export function useSlot<T = unknown>(slot: string) {
    const reg = useContext(RegistryCtx);
    return reg[slot] as T | undefined;
}
