const ADDRESS = "786 Haynes Road, Dandridge, TN 37725";

export default function GoogleMap({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border border-border ${className}`}
    >
      <iframe
        title="Deep Springs Discount Fabrics location"
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          ADDRESS
        )}&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 320 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
