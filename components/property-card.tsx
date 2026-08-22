// import Image from "next/image"
// import Link from "next/link";
// import { Button } from "@/components/ui/button"
// import { motion } from "framer-motion";
// import { BedDouble, Bath, Square, MapPin, Heart } from "lucide-react"

// interface ProjectConfig {
//   unitType: string;
//   buildAreaRange: string;
//   price: string;
// }

// interface PropertyCardProps {
//   image: string;
//   title: string;
//   location: string;
//   type: string;
//   featured?: boolean;
//   slug: string;
//   configs: ProjectConfig[];
// }

// export function PropertyCard({
//   image,
//   title,
//   location,
//   type,
//   featured = false,
//   configs,
//   slug
// }: PropertyCardProps) {

//   const startingPrice =
//   configs.length > 0
//     ? Math.min(...configs.map((c) => Number(c.price)))
//     : null;

//   return (
//     <div className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
//       {/* Image */}
//       <div className="relative h-56 overflow-hidden">
//         <Image
//           src={image}
//           alt={title}
//           fill
//           className="object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//         <div className="absolute top-4 left-4 flex gap-2">
//           {featured && (
//             // <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
//             <motion.span
//               className="
//                 inline-flex items-center
//                 px-3 py-1
//                 rounded-full
//                 text-xs font-semibold
//                 text-white
//               "
//               animate={{
//                 backgroundColor: [
//                   "#b48c3c",
//                   "#e8c878",
//                   "#b48c3c",
//                 ],
//                 scale: [1, 1.08, 1],
//                 boxShadow: [
//                   "0 0 0px rgba(180,140,60,0)",
//                   "0 0 20px rgba(180,140,60,0.8)",
//                   "0 0 0px rgba(180,140,60,0)",
//                 ],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               Featured
//             </motion.span>
//             // </span>
//           )}
//           {/* <span className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full"> */}
//           <motion.span
//             className="
//               inline-flex items-center
//               px-3 py-1
//               rounded-full
//               text-xs font-medium
//               text-white
//             "
//             animate={{
//               backgroundColor: [
//                 "#8f6b24",
//                 "#b48c3c",
//                 "#8f6b24",
//               ],
//               scale: [1, 1.04, 1],
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           >
//             {type}
//           </motion.span>
//           {/* </span> */}
//         </div>
//         <button className="absolute top-4 right-4 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
//           <Heart className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="p-5 space-y-4">
//         <div>
//           <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
//             {title}
//           </h3>
//           <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
//             <MapPin className="w-4 h-4" />
//             <span>{location}</span>
//           </div>
//         </div>

//         <div className="space-y-2">
//           {configs.map((config) => (
//             <div
//               key={config.unitType}
//               className="flex items-center justify-between text-sm border rounded-lg px-3 py-2"
//             >
//               <div className="flex items-center gap-2">
//                 <BedDouble className="w-4 h-4 text-primary" />
//                 <span className="font-medium">{config.unitType}</span>
//               </div>

//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <Square className="w-4 h-4" />
//                 <span>{config.buildAreaRange} sqft</span>
//               </div>

//               <div className="font-semibold text-primary">
//                 ₹{Number(config.price).toLocaleString()}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center justify-between pt-4 border-t border-border">
//           <div>
//             <span className="text-2xl font-semibold text-primary">
//               {startingPrice
//                 ? `₹${startingPrice.toLocaleString()}`
//                 : "Price on Request"}
//             </span>

//             {startingPrice && (
//               <span className="text-muted-foreground text-sm ml-1">
//                 onwards
//               </span>
//             )}
//           </div>
//           <Link href={`/Projects/${slug}`}>
//           <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
//             View Details
//           </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }





import Image from "next/image"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";
import { BedDouble, Bath, Square, MapPin, Heart } from "lucide-react"
import { useSavedProject} from "@/hooks/useSavedProperty"; // <-- import hook

interface ProjectConfig {
  unitType: string;
  buildAreaRange: string;
  price: string;
}

interface PropertyCardProps {
  projectId: string | number;        // <-- ADD THIS
  image: string;
  title: string;
  location: string;
  type: string;
  featured?: boolean;
  slug: string;
  configs: ProjectConfig[];
  initialSaved?: boolean;    // <-- ADD THIS
}

export function PropertyCard({
  projectId,                // <-- destructured
  image,
  title,
  location,
  type,
  featured = false,
  configs,
  slug,
  initialSaved = false,      // <-- destructured
}: PropertyCardProps) {

  const { isSaved, isLoading, toggleSave } = useSavedProject(projectId, initialSaved);

  const startingPrice =
    configs.length > 0
      ? Math.min(...configs.map((c) => Number(c.price)))
      : null;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {featured && (
            <motion.span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
              animate={{
                backgroundColor: ["#b48c3c", "#e8c878", "#b48c3c"],
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 0px rgba(180,140,60,0)",
                  "0 0 20px rgba(180,140,60,0.8)",
                  "0 0 0px rgba(180,140,60,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Featured
            </motion.span>
          )}
          <motion.span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
            animate={{
              backgroundColor: ["#8f6b24", "#b48c3c", "#8f6b24"],
              scale: [1, 1.04, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {type}
          </motion.span>
        </div>

        {/* ❤️ SAVE BUTTON — wired up */}
        <button
          onClick={toggleSave}
          disabled={isLoading}
          className="absolute top-4 right-4 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors disabled:opacity-50 hover:bg-background"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isSaved ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-primary"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        <div className="space-y-2">
          {configs.map((config) => (
            <div
              key={config.unitType}
              className="flex items-center justify-between text-sm border rounded-lg px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-primary" />
                <span className="font-medium">{config.unitType}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Square className="w-4 h-4" />
                <span>{config.buildAreaRange} sqft</span>
              </div>
              <div className="font-semibold text-primary">
                ₹{Number(config.price).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-semibold text-primary">
              {startingPrice ? `₹${startingPrice.toLocaleString()}` : "Price on Request"}
            </span>
            {startingPrice && (
              <span className="text-muted-foreground text-sm ml-1">onwards</span>
            )}
          </div>
          <Link href={`/Projects/${slug}`}>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
