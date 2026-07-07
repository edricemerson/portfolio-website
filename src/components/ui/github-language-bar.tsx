import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const LANGUAGE_COLORS: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    SCSS: "#c6538c",
    Python: "#3572A5",
    Go: "#00ADD8",
    Java: "#b07219",
    PHP: "#4F5D95",
    Ruby: "#701516",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Shell: "#89e051",
    Vue: "#41b883",
    Dockerfile: "#384d54",
    Rust: "#dea584",
    Kotlin: "#A97BFF",
    Swift: "#F05138",
}

const FALLBACK_COLOR = "#8b8b8b"

interface GithubLanguageBarProps {
    repo: string
    className?: string
}

export function GithubLanguageBar({ repo, className }: GithubLanguageBarProps) {
    const [languages, setLanguages] = useState<Record<string, number> | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        let cancelled = false
        setLanguages(null)
        setError(false)

        fetch(`https://api.github.com/repos/${repo}/languages`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch languages")
                return res.json()
            })
            .then((data) => {
                if (!cancelled) setLanguages(data)
            })
            .catch(() => {
                if (!cancelled) setError(true)
            })

        return () => {
            cancelled = true
        }
    }, [repo])

    if (error) return null

    if (!languages) {
        return <div className={cn("h-2 w-full animate-pulse rounded-full bg-white/10", className)} />
    }

    const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0)
    if (total === 0) return null

    const entries = Object.entries(languages)
        .map(([name, bytes]) => ({ name, percent: (bytes / total) * 100 }))
        .sort((a, b) => b.percent - a.percent)

    return (
        <div className={cn("flex flex-col gap-3", className)}>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/10">
                {entries.map((entry) => (
                    <div
                        key={entry.name}
                        style={{
                            width: `${entry.percent}%`,
                            backgroundColor: LANGUAGE_COLORS[entry.name] ?? FALLBACK_COLOR,
                        }}
                    />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {entries.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-1.5 text-xs text-white/70">
                        <span
                            className="size-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: LANGUAGE_COLORS[entry.name] ?? FALLBACK_COLOR }}
                        />
                        <span className="font-medium text-white/90">{entry.name}</span>
                        <span>{entry.percent.toFixed(1)}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
