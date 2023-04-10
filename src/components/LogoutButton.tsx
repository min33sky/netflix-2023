'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

/**
 * 임시 로그아웃 버튼
 */
export default function LogoutButton() {
  return (
    <button onClick={() => signOut()} className="text-white">
      로그아웃
    </button>
  );
}
