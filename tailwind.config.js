/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 🥬 Primary Brand Colors - Fresh Green (represents freshness & healthy eating)
        primary: "#7DD3A0", // Soft mint green - fresh, clean, healthy
        primaryLight: "#A8E6C1", // Light mint
        primaryDark: "#5FB382", // Deeper mint
        
        // 🍊 Accent Colors - Warm Peach (represents warmth & comfort of home cooking)
        accent: "#FFB5A7", // Soft coral peach - warm, inviting
        accentLight: "#FFC9BE", // Light peach
        accentDark: "#FF9A8B", // Deeper peach
        
        // 🌸 Secondary Accents - Soft Lavender (represents organization & calm)
        secondaryAccent: "#C4A5DE", // Soft lavender - calming, organized
        secondaryAccentLight: "#D4BAE8", // Light lavender
        
        // ⚠️ Status Colors (Food-themed)
        warning: "#FFD93D", // Sunny yellow - caution, expiring soon
        warningLight: "#FFF2A6", // Very light yellow
        error: "#FF8A95", // Soft red - expired, urgent
        errorLight: "#FFB3BA", // Light coral red
        success: "#7DD3A0", // Fresh green - good, fresh
        successLight: "#B5E4C7", // Light mint green
        
        // 🏠 Background Colors - Clean Kitchen Aesthetic
        background: "#FEFCF8", // Warm ivory - clean, kitchen-like
        backgroundSecondary: "#F8F6F2", // Light cream
        surface: "#FFFFFF", // Pure white - clean surfaces
        surfaceSecondary: "#FAFAF9", // Off-white
        
        // 📦 Card Colors - Pantry Organization
        card: "#FFFFFF", // White - clean containers
        cardHover: "#F9F8F6", // Light cream on hover
        cardBorder: "#E8E5E0", // Soft beige border
        
        // 📝 Text Colors - Kitchen-friendly
        textPrimary: "#2D3748", // Dark charcoal - readable
        textSecondary: "#718096", // Medium gray
        textMuted: "#A0AEC0", // Light gray
        textInverse: "#FFFFFF", // White text
        
        // 🎨 Food Category Cards (Pastel & Food-themed)
        cardFruit: "#FFE4E1", // Soft pink - fruits
        cardVegetable: "#E8F5E8", // Light green - vegetables
        cardDairy: "#F0F8FF", // Light blue - dairy
        cardMeat: "#FFF0F5", // Light rose - meat/protein
        cardGrain: "#FFF8DC", // Light wheat - grains/cereals
        cardSpice: "#FFEFD5", // Light orange - spices
        cardBeverage: "#E6F3FF", // Light sky blue - beverages
        cardFrozen: "#F0F8FF", // Icy blue - frozen items
        cardCanned: "#F5F5DC", // Light beige - canned goods
        
        // 🏷️ Food Category Text Colors
        textFruit: "#D53F8C", // Berry pink
        textVegetable: "#38A169", // Fresh green
        textDairy: "#3182CE", // Blue
        textMeat: "#E53E3E", // Red
        textGrain: "#D69E2E", // Wheat gold
        textSpice: "#DD6B20", // Spice orange
        textBeverage: "#319795", // Teal
        textFrozen: "#4299E1", // Ice blue
        textCanned: "#A0AEC0", // Neutral gray
        
        // 📅 Expiration Status Colors
        fresh: "#68D391", // Bright green - fresh items
        expiringSoon: "#F6E05E", // Warm yellow - expiring in 2-3 days
        expired: "#FC8181", // Soft red - expired items
        
        // 🔘 Interactive States
        interactive: "#7DD3A0", // Primary green
        interactiveHover: "#5FB382", // Darker green on hover
        interactiveActive: "#4A9B6E", // Even darker when active
        
        // 🎭 Neutral Shades - Kitchen Inspired
        neutral: {
          50: "#FEFCF8", // Warm ivory
          100: "#F8F6F2", // Light cream
          200: "#E8E5E0", // Soft beige
          300: "#D1CCC4", // Light taupe
          400: "#9E9B94", // Medium taupe
          500: "#6B6B6B", // Gray
          600: "#4A5568", // Dark gray
          700: "#2D3748", // Charcoal
          800: "#1A202C", // Dark charcoal
          900: "#171923", // Near black
        },
        
        // 🥘 Kitchen Atmosphere Colors
        warmWhite: "#FEFCF8", // Warm kitchen white
        creamyBeige: "#F8F6F2", // Creamy surfaces
        softSage: "#E8F5E8", // Herb-like green
        butterYellow: "#FFF8DC", // Warm butter color
        lavenderGray: "#F0F0F5", // Clean, organized feeling
      },
      
      fontFamily: {
        heading: ["PlayfairBold"], // Elegant for headers
        body: ["OutfitRegular"], // Clean, modern for body text
        soft: ["DMSansRegular"], // Friendly for labels
        modern: ["SpaceGroteskRegular"], // Contemporary for accents
      },
      
      borderColor: {
        background: "#FEFCF8",
      },
      
      // 🎨 Kitchen-themed Gradients
      backgroundImage: {
        'gradient-fresh': 'linear-gradient(135deg, #7DD3A0 0%, #A8E6C1 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFB5A7 0%, #FFC9BE 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #FFD93D 0%, #FFB5A7 100%)',
        'gradient-morning': 'linear-gradient(135deg, #C4A5DE 0%, #7DD3A0 100%)',
        'gradient-cream': 'linear-gradient(135deg, #FEFCF8 0%, #F8F6F2 100%)',
      },
      
      // 🎯 Soft Shadows - Clean Kitchen Aesthetic
      boxShadow: {
        'soft': '0 2px 4px 0 rgba(125, 211, 160, 0.1)',
        'medium': '0 4px 8px 0 rgba(125, 211, 160, 0.15)',
        'large': '0 8px 16px 0 rgba(125, 211, 160, 0.2)',
        'food-card': '0 3px 6px 0 rgba(45, 55, 72, 0.1)',
        'expiring': '0 2px 8px 0 rgba(246, 224, 94, 0.3)',
        'expired': '0 2px 8px 0 rgba(252, 129, 129, 0.3)',
      },
    },
  },
  plugins: [],
};