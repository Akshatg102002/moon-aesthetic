import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface BookNowContextType {
  isOpen: boolean;
  openModal: (prefillService?: string) => void;
  closeModal: () => void;
  prefillService: string;
}

const BookNowContext = createContext<BookNowContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  prefillService: '',
});

export function BookNowProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillService, setPrefillService] = useState('');

  const openModal = useCallback((service?: string) => {
    setPrefillService(service || '');
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setPrefillService('');
    document.body.style.overflow = '';
  }, []);

  return (
    <BookNowContext.Provider value={{ isOpen, openModal, closeModal, prefillService }}>
      {children}
    </BookNowContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBookNow = () => useContext(BookNowContext);
