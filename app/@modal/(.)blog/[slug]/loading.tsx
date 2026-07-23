// Skeleton loading.... I still remember the things that I learnt as a performance engineer
export default function BlogModalLoading() {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="w-[90vw] max-w-4xl max-h-[75vh] bg-background border-2 border-primary rounded-lg p-6 md:p-10 animate-pulse space-y-4">
				<div className="h-8 w-3/4 md:w-2/3 bg-primary/40 rounded-md" />
				<div className="flex gap-2 pt-1">
					<div className="h-5 w-16 bg-card border border-primary/30 rounded-full" />
					<div className="h-5 w-14 bg-card border border-primary/30 rounded-full" />
					<div className="h-5 w-20 bg-card border border-primary/30 rounded-full" />
				</div>
				<hr className="border-primary/20" />
				<div className="space-y-2">
					{[...Array(8)].map((_, i) => (
						<div key={i} className={`h-4 bg-muted rounded ${i % 4 === 3 ? "w-3/4" : "w-full"}`} />
					))}
				</div>
			</div>
		</div>
	);
}
