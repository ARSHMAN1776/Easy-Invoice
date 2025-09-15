import React from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WORLD_CURRENCIES } from '../utils/currencies';

const BillToSection = ({ billTo, handleInputChange, selectedCurrency, setSelectedCurrency }) => {
  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Select Currency</h3>
        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder="Choose currency" />
          </SelectTrigger>
          <SelectContent className="bg-background border shadow-lg z-50">
            {WORLD_CURRENCIES.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                <span className="flex items-center gap-2">
                  <span className="font-medium">{currency.code}</span>
                  <span className="text-muted-foreground">({currency.symbol})</span>
                  <span className="text-sm">{currency.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Bill To</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          id="billToName"
          label="Name"
          value={billTo.name}
          onChange={handleInputChange}
          name="name"
        />
        <FloatingLabelInput
          id="billToPhone"
          label="Phone"
          value={billTo.phone}
          onChange={handleInputChange}
          name="phone"
        />
      </div>
      <FloatingLabelInput
        id="billToAddress"
        label="Address"
        value={billTo.address}
        onChange={handleInputChange}
        name="address"
        className="mt-4"
      />
    </div>
  );
};

export default BillToSection;