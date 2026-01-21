import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, name: 'Tipo', short: 'Tipo' },
  { id: 2, name: 'Relato', short: 'Relato' },
  { id: 3, name: 'Anexos', short: 'Anexos' },
  { id: 4, name: 'Identificação', short: 'ID' },
  { id: 5, name: 'Revisão', short: 'Revisão' },
];

export default function StepIndicator({ currentStep }) {
  return (
    <nav aria-label="Progresso do registro" className="mb-8">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  currentStep > step.id
                    ? "bg-emerald-500 text-white"
                    : currentStep === step.id
                    ? "bg-blue-900 text-white ring-4 ring-blue-200"
                    : "bg-gray-200 text-gray-500"
                )}
                aria-current={currentStep === step.id ? "step" : undefined}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" aria-hidden="true" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium hidden sm:block",
                  currentStep >= step.id ? "text-blue-900" : "text-gray-400"
                )}
              >
                {step.name}
              </span>
              <span
                className={cn(
                  "mt-2 text-xs font-medium sm:hidden",
                  currentStep >= step.id ? "text-blue-900" : "text-gray-400"
                )}
              >
                {step.short}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-2 sm:mx-4 rounded transition-all duration-300",
                  currentStep > step.id ? "bg-emerald-500" : "bg-gray-200"
                )}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}