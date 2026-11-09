'use client';

import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, MapPin, Globe } from 'lucide-react';

interface PremiumSearchProps {
  onCountrySelect: (countryName: string) => void;
  countries: { name: string; region: string }[];
}

export const MapSearch: React.FC<PremiumSearchProps> = ({ onCountrySelect, countries }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-mist/50 border border-mist rounded-xl shadow-sm transition-all duration-200 group text-left"
        >
          <Search className="w-4 h-4 text-accent-gold group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm font-medium text-charcoal/60 flex-1">
            {query || "Search for a country..."}
          </span>
          <div className="flex items-center gap-1 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest bg-mist px-2 py-1 rounded-md">
            <span>Explore</span>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl border-mist shadow-xl overflow-hidden" align="start">
        <Command shouldFilter={false} className="bg-white">
          <CommandInput 
            placeholder="Type a country or region..." 
            value={query} 
            onValueChange={setQuery} 
            className="border-none focus:ring-0 text-deep-forest font-medium"
          />
          <CommandList className="max-h-[280px] custom-scrollbar">
            <CommandEmpty className="py-6 text-center text-sm text-charcoal/60 font-light">
              No portfolio countries found.
            </CommandEmpty>
            <CommandGroup className="px-2 pb-2">
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.name}
                  value={country.name}
                  onSelect={() => {
                    onCountrySelect(country.name);
                    setOpen(false);
                    setQuery('');
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-mist aria-selected:bg-mist transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-mist flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <Globe className="w-4 h-4 text-primary-green" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-deep-forest">{country.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">
                      {country.region}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
