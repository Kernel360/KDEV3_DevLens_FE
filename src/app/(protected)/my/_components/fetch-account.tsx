"use client";

import { Suspense } from "react";
import AccountInfo from "./account-info";

export default function FetchAccount() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountInfo />
    </Suspense>
  );
}
