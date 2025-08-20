"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Banknote, Building, Shield, CheckCircle } from "lucide-react"

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: any
  fee: number
  isPopular?: boolean
  requiresDetails?: boolean
}

interface PaymentSelectionProps {
  totalAmount: number
  onPaymentMethodSelect: (method: string, details?: any) => void
  selectedMethod?: string
}

export function PaymentSelection({ totalAmount, onPaymentMethodSelect, selectedMethod }: PaymentSelectionProps) {
  const [paymentDetails, setPaymentDetails] = useState<any>({})

  const paymentMethods: PaymentMethod[] = [
    {
      id: "cash_on_service",
      name: "Cash on Service",
      description: "Pay when you receive the service",
      icon: Banknote,
      fee: 0,
      isPopular: true,
    },
    {
      id: "jazzcash",
      name: "JazzCash",
      description: "Pay with JazzCash mobile wallet",
      icon: Smartphone,
      fee: 0,
      requiresDetails: true,
    },
    {
      id: "easypaisa",
      name: "EasyPaisa",
      description: "Pay with EasyPaisa mobile wallet",
      icon: Smartphone,
      fee: 0,
      requiresDetails: true,
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      description: "Direct bank account transfer",
      icon: Building,
      fee: 0,
      requiresDetails: true,
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Pay with Visa, Mastercard, or local cards",
      icon: CreditCard,
      fee: Math.round(totalAmount * 0.025), // 2.5% processing fee
      requiresDetails: true,
    },
  ]

  const handleMethodSelect = (methodId: string) => {
    const method = paymentMethods.find((m) => m.id === methodId)
    if (method && !method.requiresDetails) {
      onPaymentMethodSelect(methodId)
    }
  }

  const handlePaymentSubmit = () => {
    if (selectedMethod) {
      onPaymentMethodSelect(selectedMethod, paymentDetails)
    }
  }

  const selectedMethodData = paymentMethods.find((m) => m.id === selectedMethod)
  const finalAmount = totalAmount + (selectedMethodData?.fee || 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedMethod} onValueChange={handleMethodSelect} className="space-y-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon
              const isSelected = selectedMethod === method.id

              return (
                <div key={method.id} className="relative">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleMethodSelect(method.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={method.id} className="font-medium cursor-pointer">
                              {method.name}
                            </Label>
                            {method.isPopular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <div className="text-right">
                          {method.fee > 0 ? (
                            <p className="text-sm text-muted-foreground">+PKR {method.fee.toLocaleString()}</p>
                          ) : (
                            <p className="text-sm text-green-600">Free</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Details Form */}
      {selectedMethodData?.requiresDetails && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedMethod === "jazzcash" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jazzcash_number">JazzCash Mobile Number</Label>
                  <Input
                    id="jazzcash_number"
                    placeholder="03XX-XXXXXXX"
                    value={paymentDetails.jazzcash_number || ""}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, jazzcash_number: e.target.value })}
                  />
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900">Secure Payment</p>
                      <p className="text-blue-700">
                        You'll receive a payment request on your JazzCash app to complete the transaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === "easypaisa" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="easypaisa_number">EasyPaisa Mobile Number</Label>
                  <Input
                    id="easypaisa_number"
                    placeholder="03XX-XXXXXXX"
                    value={paymentDetails.easypaisa_number || ""}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, easypaisa_number: e.target.value })}
                  />
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-900">Secure Payment</p>
                      <p className="text-green-700">
                        You'll receive a payment request on your EasyPaisa app to complete the transaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === "bank_transfer" && (
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Bank Account Details</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Account Title:</strong> Bella Beauty Parlor
                    </p>
                    <p>
                      <strong>Account Number:</strong> 1234567890123456
                    </p>
                    <p>
                      <strong>Bank:</strong> HBL Bank
                    </p>
                    <p>
                      <strong>Branch Code:</strong> 1234
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transaction_id">Transaction Reference ID</Label>
                  <Input
                    id="transaction_id"
                    placeholder="Enter transaction ID after transfer"
                    value={paymentDetails.transaction_id || ""}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, transaction_id: e.target.value })}
                  />
                </div>
              </div>
            )}

            {selectedMethod === "card" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="card_number">Card Number</Label>
                    <Input
                      id="card_number"
                      placeholder="1234 5678 9012 3456"
                      value={paymentDetails.card_number || ""}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, card_number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={paymentDetails.expiry || ""}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={paymentDetails.cvv || ""}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card_name">Cardholder Name</Label>
                  <Input
                    id="card_name"
                    placeholder="Name as on card"
                    value={paymentDetails.card_name || ""}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, card_name: e.target.value })}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Service Amount</span>
              <span>PKR {totalAmount.toLocaleString()}</span>
            </div>
            {selectedMethodData?.fee && selectedMethodData.fee > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Processing Fee</span>
                <span>PKR {selectedMethodData.fee.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span className="text-primary">PKR {finalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {selectedMethod && (
            <div className="mt-6">
              {selectedMethod === "cash_on_service" ? (
                <Button onClick={handlePaymentSubmit} className="w-full" size="lg">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Booking (Pay Later)
                </Button>
              ) : (
                <Button onClick={handlePaymentSubmit} className="w-full" size="lg">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Process Payment
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
