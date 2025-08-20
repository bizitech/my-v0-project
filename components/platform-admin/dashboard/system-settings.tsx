"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SystemSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">System Settings</h2>
        <p className="text-gray-600">Configure platform-wide settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Information</CardTitle>
                <CardDescription>Basic platform configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="Bella Beauty Marketplace" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform-description">Description</Label>
                  <Textarea
                    id="platform-description"
                    defaultValue="Pakistan's leading beauty salon marketplace"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@bellabeauty.pk" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input id="support-phone" defaultValue="+92-300-BEAUTY1" />
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registration Settings</CardTitle>
                <CardDescription>Control salon registration process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-approve">Auto-approve salon registrations</Label>
                    <p className="text-sm text-gray-600">Automatically approve new salon registrations</p>
                  </div>
                  <Switch id="auto-approve" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="require-verification">Require document verification</Label>
                    <p className="text-sm text-gray-600">Require CNIC and business documents</p>
                  </div>
                  <Switch id="require-verification" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-registrations">Allow new registrations</Label>
                    <p className="text-sm text-gray-600">Enable new salon registrations</p>
                  </div>
                  <Switch id="allow-registrations" defaultChecked />
                </div>

                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Commission Settings</CardTitle>
                <CardDescription>Platform commission and fee structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                  <Input id="commission-rate" type="number" defaultValue="10" min="0" max="50" />
                  <p className="text-sm text-gray-600">Percentage commission on each booking</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transaction-fee">Transaction Fee (PKR)</Label>
                  <Input id="transaction-fee" type="number" defaultValue="50" min="0" />
                  <p className="text-sm text-gray-600">Fixed fee per transaction</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimum-payout">Minimum Payout (PKR)</Label>
                  <Input id="minimum-payout" type="number" defaultValue="1000" min="100" />
                  <p className="text-sm text-gray-600">Minimum amount for salon payouts</p>
                </div>

                <Button>Save Commission Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Configure available payment options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-jazzcash">JazzCash</Label>
                    <p className="text-sm text-gray-600">Enable JazzCash payments</p>
                  </div>
                  <Switch id="enable-jazzcash" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-easypaisa">EasyPaisa</Label>
                    <p className="text-sm text-gray-600">Enable EasyPaisa payments</p>
                  </div>
                  <Switch id="enable-easypaisa" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-bank">Bank Transfer</Label>
                    <p className="text-sm text-gray-600">Enable bank transfer payments</p>
                  </div>
                  <Switch id="enable-bank" defaultChecked />
                </div>

                <Button>Save Payment Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Send email notifications to users</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-gray-600">Send SMS notifications to users</p>
                </div>
                <Switch id="sms-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="booking-reminders">Booking Reminders</Label>
                  <p className="text-sm text-gray-600">Send automatic booking reminders</p>
                </div>
                <Switch id="booking-reminders" defaultChecked />
              </div>

              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>System maintenance and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
                  <p className="text-sm text-gray-600">Put the platform in maintenance mode</p>
                </div>
                <Switch id="maintenance-mode" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance-message">Maintenance Message</Label>
                <Textarea
                  id="maintenance-message"
                  placeholder="We're currently performing scheduled maintenance..."
                  rows={3}
                />
              </div>

              <Button>Update Maintenance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
