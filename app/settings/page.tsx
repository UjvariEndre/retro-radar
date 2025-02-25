import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <ul className="mt-4 space-y-2">
        <li>
          <Link href="/settings/profile">Edit Profile</Link>
        </li>
        <li>
          <Link href="/settings/account">Account Settings</Link>
        </li>
      </ul>
    </div>
  );
}
