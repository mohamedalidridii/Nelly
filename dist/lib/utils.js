"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = exports.cn = void 0;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
function formatPrice(price, options = {}) {
    const { currency = 'USD', notation = 'compact' } = options;
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
        style: "currency",
        currency,
        notation,
        maximumFractionDigits: 2,
    }).format(numericPrice);
}
exports.formatPrice = formatPrice;
