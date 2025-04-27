import Link from "next/link"
import { Heart, Coffee } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 bg-background">
      <div className="container flex justify-center items-center">
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          Made with
          <Heart className="h-4 w-4 text-red-500 inline" fill="currentColor" />
          &amp;
          <Coffee className="h-4 w-4 text-amber-700 inline" />@
          <Link
            href="https://dragonhacks11.devpost.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            DragonHacks
          </Link>
        </p>
      </div>
    </footer>
  )
}
