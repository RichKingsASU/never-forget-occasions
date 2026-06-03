import { Navigation } from "@/components/Navigation";
import { GiftCard } from "@/components/GiftCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Heart, Star, Gift } from "lucide-react";

export const GiftCatalog = () => {
  const categories = [
    { id: "all", label: "All Gifts", count: 156 },
    { id: "gift-cards", label: "Gift Cards", count: 45 },
    { id: "flowers", label: "Flowers", count: 32 },
    { id: "food", label: "Food & Treats", count: 28 },
    { id: "experiences", label: "Experiences", count: 25 },
    { id: "jewelry", label: "Jewelry", count: 18 },
    { id: "tech", label: "Tech", count: 8 }
  ];

  const occasions = [
    "Birthday", "Anniversary", "Graduation", "Valentine's Day", 
    "Mother's Day", "Father's Day", "Holiday", "Thank You"
  ];

  const sampleGifts = [
    {
      id: "1",
      name: "Starbucks Gift Card",
      category: "Gift Cards",
      price: 25,
      provider: "Starbucks",
      occasions: ["Birthday", "Thank You", "Holiday"],
      description: "Perfect for coffee lovers. Redeemable at any Starbucks location.",
      rating: 4.8,
      isPopular: true,
      deliveryTime: "Instant"
    },
    {
      id: "2", 
      name: "Premium Rose Bouquet",
      category: "Flowers",
      price: 65,
      provider: "FTD",
      occasions: ["Anniversary", "Valentine's Day", "Birthday"],
      description: "Beautiful dozen red roses with premium delivery.",
      rating: 4.9,
      deliveryTime: "Same Day"
    },
    {
      id: "3",
      name: "Amazon Gift Card",
      category: "Gift Cards", 
      price: 50,
      provider: "Amazon",
      occasions: ["Birthday", "Graduation", "Holiday"],
      description: "The gift that lets them choose exactly what they want.",
      rating: 4.7,
      isPopular: true,
      deliveryTime: "Instant"
    },
    {
      id: "4",
      name: "Gourmet Chocolate Box",
      category: "Food & Treats",
      price: 35,
      provider: "Godiva",
      occasions: ["Valentine's Day", "Anniversary", "Thank You"],
      description: "Assorted premium chocolates in elegant packaging.",
      rating: 4.6,
      deliveryTime: "1-2 Days"
    },
    {
      id: "5",
      name: "Spa Day Experience",
      category: "Experiences",
      price: 120,
      provider: "Spafinder",
      occasions: ["Birthday", "Mother's Day", "Anniversary"],
      description: "Relaxing spa experience at premium locations nationwide.",
      rating: 4.8,
      deliveryTime: "Digital Voucher"
    },
    {
      id: "6",
      name: "DoorDash Credit",
      category: "Food & Treats",
      price: 30,
      provider: "DoorDash",
      occasions: ["Birthday", "Thank You", "Holiday"],
      description: "Let them enjoy their favorite meal delivered fresh.",
      rating: 4.5,
      deliveryTime: "Instant"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="gifts" />
      
      <div className="p-4 md:p-8 lg:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Gift Catalog 🎁</h1>
              <p className="text-muted-foreground">Add thoughtful gifts to make every occasion special</p>
            </div>
            <Button variant="gradient">
              <Gift className="w-4 h-4" />
              Browse by Occasion
            </Button>
          </div>

          {/* Search and Filters */}
          <Card className="p-6 mb-8 border-0 shadow-soft">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search gifts..." 
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                  Price Range
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4" />
                  Popular
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="w-4 h-4" />
                  Highest Rated
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 border-0 shadow-soft sticky top-8">
                <h3 className="font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                        category.id === 'all'
                          ? "bg-gradient-secondary text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <span>{category.label}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-foreground mb-4">Occasions</h3>
                  <div className="flex flex-wrap gap-2">
                    {occasions.map((occasion) => (
                      <Badge 
                        key={occasion} 
                        variant="secondary" 
                        className="text-xs cursor-pointer hover:bg-primary hover:text-white transition-smooth"
                      >
                        {occasion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Gift Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">All Gifts ({sampleGifts.length})</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Sort by:</span>
                  <select className="bg-background border border-input rounded-md px-2 py-1">
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sampleGifts.map((gift) => (
                  <GiftCard key={gift.id} {...gift} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Gifts
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Showing 6 of 156 gifts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};