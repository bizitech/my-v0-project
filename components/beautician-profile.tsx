"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, Award, MessageCircle, Heart, Share2 } from "lucide-react"

interface BeauticianProfileProps {
  beautician: {
    name: string
    businessName: string
    location: string
    rating: number
    reviews: number
    image: string
    bio: string
    experience: string
    specialties: string[]
    isAtHome: boolean
    isAtSalon: boolean
    salonAddress?: string
    responseTime: string
    languages: string[]
    gallery: string[]
    reviews: Array<{
      id: number
      name: string
      rating: number
      comment: string
      date: string
      service: string
    }>
  }
}

export function BeauticianProfile({ beautician }: BeauticianProfileProps) {
  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-32 w-32">
                <AvatarImage src={beautician.image || "/placeholder.svg"} alt={beautician.name} />
                <AvatarFallback className="text-2xl">
                  {beautician.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{beautician.name}</h1>
                <p className="text-lg text-muted-foreground">{beautician.businessName}</p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{beautician.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">{beautician.rating}</span>
                  <span className="text-muted-foreground">({beautician.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{beautician.responseTime}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {beautician.isAtHome && (
                  <Badge variant="secondary" className="text-sm">
                    At Home Service
                  </Badge>
                )}
                {beautician.isAtSalon && (
                  <Badge variant="outline" className="text-sm">
                    Salon Service
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-muted-foreground mb-4">{beautician.bio}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Experience
              </h3>
              <p className="text-muted-foreground">{beautician.experience}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Languages</h3>
              <div className="flex gap-2">
                {beautician.languages.map((lang) => (
                  <Badge key={lang} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {beautician.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-sm">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {beautician.salonAddress && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Salon Address</h3>
              <p className="text-muted-foreground">{beautician.salonAddress}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gallery */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {beautician.gallery.map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Reviews ({beautician.reviews.length})</h2>
          <div className="space-y-4">
            {beautician.reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.name}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-1">{review.comment}</p>
                    <Badge variant="outline" className="text-xs">
                      {review.service}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
