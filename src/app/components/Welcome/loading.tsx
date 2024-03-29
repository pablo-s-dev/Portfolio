export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <LoadingSkeleton />
}

function LoadingSkeleton() {
    return (
        <div className="loading-skeleton"></div>
    )
}