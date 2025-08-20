"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Flag, Check, X, Eye } from "lucide-react"

interface ReviewModerationProps {
  reviews: any[]
}

export function ReviewModeration({ reviews }: ReviewModerationProps) {
  const [filter, setFilter] = useState("all")

  const flaggedReviews = reviews.filter((r) => r.is_flagged)
  const recentReviews = reviews.slice(0, 20)

  const filteredReviews = filter === "flagged" ? flaggedReviews : recentReviews

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Review Moderation</h2>
          <p className="text-gray-600">Monitor and moderate customer reviews</p>
        </div>
        <div className="flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            All Reviews ({reviews.length})
          </Button>
          <Button variant={filter === "flagged" ? "default" : "outline"} onClick={() => setFilter("flagged")}>
            Flagged ({flaggedReviews.length})
          </Button>
        </div>
      </div>

      {/* Review Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Reviews</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flaggedReviews.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews.filter((r) => new Date(r.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className={review.is_flagged ? "border-red-200 bg-red-50" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{review.customers?.full_name || "Anonymous"}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    {review.is_flagged && (
                      <Badge variant="destructive">
                        <Flag className="h-3 w-3 mr-1" />
                        Flagged
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-600">
                    <strong>Salon:</strong> {review.salons?.name}
                  </p>

                  <p className="text-gray-700">{review.comment}</p>

                  <p className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>

                  {review.is_flagged && (
                    <>
                      <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </>
                  )}

                  {!review.is_flagged && (
                    <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                      <Flag className="h-4 w-4 mr-1" />
                      Flag
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredReviews.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="font-medium text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-600">
                {filter === "flagged"
                  ? "No reviews have been flagged for moderation."
                  : "No reviews have been submitted yet."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
