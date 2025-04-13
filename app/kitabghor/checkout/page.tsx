"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/ecommarce/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [step, setStep] = useState("details");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 60;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    if (
      !name ||
      !mobile ||
      !location ||
      (paymentMethod !== "CashOnDelivery" && !transactionId)
    ) {
      toast.error("সব ফিল্ড পূরণ করুন");
      return;
    }

    const orderData = {
      customer: { name, mobile, email, location },
      cartItems,
      paymentMethod,
      transactionId: paymentMethod !== "CashOnDelivery" ? transactionId : null,
      total,
    };

    // Simulating API call
    console.log("Order Placed:", orderData);
    toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে!");
    clearCart();
    setStep("details");
  };

  return (
    <div className="container mx-auto py-12 px-4 grid md:grid-cols-2 gap-8">
      {/* Left Side - Customer Info */}
      <div>
        <h1 className="text-2xl font-bold mb-6">চেকআউট তথ্য</h1>
        {step === "details" && (
          <div className="space-y-4">
            <Input
              placeholder="আপনার নাম"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="মোবাইল নম্বর"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <Input
              placeholder="ইমেইল (ঐচ্ছিক)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="সম্পূর্ণ ঠিকানা"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button className="w-full" onClick={() => setStep("payment")}>
              পরবর্তী ধাপ
            </Button>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              পেমেন্ট পদ্ধতি নির্বাচন করুন
            </h2>
            {[
              { id: "bkash", label: "বিকাশ" },
              { id: "nagad", label: "নগদ" },
              { id: "rocket", label: "রকেট" },
              { id: "CashOnDelivery", label: "ক্যাশ অন ডেলিভারি" },
            ].map((method) => (
              <Button
                key={method.id}
                variant={paymentMethod === method.id ? "default" : "outline"}
                className="w-full"
                onClick={() => setPaymentMethod(method.id)}
              >
                {method.label}
              </Button>
            ))}

            {paymentMethod && paymentMethod !== "CashOnDelivery" && (
              <Input
                placeholder="ট্রান্স্যাকশন আইডি"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            )}

            {paymentMethod && (
              <Button className="w-full" onClick={handlePlaceOrder}>
                অর্ডার সম্পন্ন করুন
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Right Side - Order Summary */}
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-bold mb-4">আপনার অর্ডার</h2>
        <div className="space-y-4 mb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <div className="relative w-16 h-20">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="rounded object-cover"
                />
              </div>
              <div>
                <p className="font-medium line-clamp-1">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  ৳{item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">সাবটোটাল</span>
            <span>৳{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">শিপিং</span>
            <span>৳{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>মোট</span>
            <span>৳{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
