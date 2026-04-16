// src/components/FAQItem.jsx
import { useAccordion } from '../hooks/useAccordion';

export function FAQItem() {
  const { isOpen, toggle } = useAccordion();

  return (
    <div>
      <button onClick={toggle}>
        {isOpen ? 'Hide' : 'Show'}
      </button>
      {isOpen && <p>Contenido</p>}
    </div>
  );
}