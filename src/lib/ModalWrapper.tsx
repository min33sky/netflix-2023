'use client';

import InfoModal from '@/components/InfoModal';
import useInfoModalStore from '@/hooks/useInfoModalStore';

interface Props {
  children: React.ReactNode;
}

export default function ModalWrapper({ children }: Props) {
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <div>
      <InfoModal visible={isOpen} onClose={closeModal} />
      {children}
    </div>
  );
}
