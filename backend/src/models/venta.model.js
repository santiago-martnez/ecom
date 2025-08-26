import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
    venta_id: { type: String, required: true },
    compra_id: { type: String, required: true },
    paga: { type:  mongoose.Schema.Types.Decimal128, required: true},
    date: { type: Date, default: Date.now}
}, { timestamps: true });

export const Venta = mongoose.model("Venta", ventaSchema);
