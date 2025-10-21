import { Suspense } from "react";
import LegalContent from "./LegalContent";

export default function LegalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LegalContent />
    </Suspense>
  );
}