import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black py-8 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/SparkAIstudiologo2-0Og3dDnQwFwB2w018NubJkP7Z7wIly.png"
              alt="Spark AI Studios Logo"
              width={120}
              height={30}
              className="h-auto w-[120px]"
            />
            <span className="text-gray-400 text-sm">© 2025 Spark AI Studios. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="https://www.buyhomeabc.xyz"
              target="_blank"
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
            >
              BuyHome ABC to XYZ
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href="https://mindloop.pro"
              target="_blank"
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
            >
              MindLoop Pro
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href="https://www.retailmax.pro"
              target="_blank"
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
            >
              RetailMax Pro
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href="https://casapath.pro"
              target="_blank"
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
            >
              Casa Path Pro
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
