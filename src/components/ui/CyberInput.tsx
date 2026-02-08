"use client";

import { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Terminal } from "lucide-react";

interface CyberInputProps {
    label?: string;
    placeholder?: string;
    type?: "text" | "password" | "email" | "number" | "search";
    error?: string;
    helper?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

export const CyberInput = forwardRef<HTMLInputElement, CyberInputProps>(
    ({ label, placeholder, type = "text", error, helper, icon, disabled, required, className = "" }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const [isFocused, setIsFocused] = useState(false);
        const [value, setValue] = useState("");

        const inputType = type === "password" && showPassword ? "text" : type;

        return (
            <div className={`w-full ${className}`}>
                {label && (
                    <label className="block text-sm font-mono text-ghost mb-2">
                        <span className="text-neon/50 mr-1">$</span>
                        {label}
                        {required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                )}

                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ghost">
                            {icon}
                        </div>
                    )}

                    <motion.div
                        animate={{
                            boxShadow: isFocused
                                ? "0 0 20px rgba(0,240,255,0.2), inset 0 0 20px rgba(0,240,255,0.05)"
                                : "0 0 0px rgba(0,240,255,0)",
                        }}
                        className={`
              relative bg-black/30 border rounded-xl overflow-hidden transition-colors duration-300
              ${error ? "border-red-500/50" : isFocused ? "border-neon/50" : "border-white/10"}
              ${disabled ? "opacity-50" : ""}
            `}
                    >
                        <input
                            ref={ref}
                            type={inputType}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            disabled={disabled}
                            placeholder={placeholder}
                            className={`
                w-full bg-transparent text-white placeholder:text-ghost/50 outline-none
                ${icon ? "pl-12" : "pl-4"} 
                ${type === "password" ? "pr-12" : "pr-4"}
                py-3.5 font-mono text-sm
              `}
                        />

                        {/* Animated border line */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-neon"
                            initial={{ width: "0%" }}
                            animate={{ width: isFocused ? "100%" : "0%" }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>

                    {type === "password" && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-ghost hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    )}
                </div>

                {/* Helper/Error text */}
                {(helper || error) && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-2 text-xs font-mono ${error ? "text-red-400" : "text-ghost/70"}`}
                    >
                        {error ? `[!] ${error}` : `[i] ${helper}`}
                    </motion.p>
                )}
            </div>
        );
    }
);
CyberInput.displayName = "CyberInput";