import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon, ChevronDown, ChevronRight } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import clsx from 'clsx';

interface NavigationItem {
  name: string;
  nameAr: string;
  icon: LucideIcon;
  href?: string;
  children?: NavigationItem[];
  special?: boolean;
  onClick?: () => boolean;
}

interface NavigationProps {
  items: NavigationItem[];
  mobile?: boolean;
  onItemClick?: (item: NavigationItem) => void;
}

export function Navigation({ items, mobile = false, onItemClick }: NavigationProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { currentLanguage } = useLanguageStore();

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const handleItemClick = (item: NavigationItem) => {
    if (onItemClick) {
      const shouldPreventDefault = onItemClick(item);
      if (shouldPreventDefault) {
        return;
      }
    }
  };

  const renderNavigationItem = (item: NavigationItem, depth = 0) => {
    const isExpanded = expandedItems.includes(item.name);
    const isActive = item.href ? location.pathname === item.href : false;
    const hasChildren = item.children && item.children.length > 0;
    const displayName = currentLanguage === 'ar' ? item.nameAr : item.name;

    const itemClasses = clsx(
      'group flex items-center justify-between w-full rounded-md p-2 text-sm leading-6 font-semibold transition-colors duration-150',
      isActive
        ? 'bg-gray-50 text-blue-600'
        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
      depth > 0 && 'mr-4',
      mobile && 'touch-manipulation',
      item.special && 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    );

    const content = (
      <div className="flex items-center gap-x-3">
        <item.icon
          className={clsx(
            isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600',
            'h-6 w-6 shrink-0'
          )}
          aria-hidden="true"
        />
        <span className="truncate">{displayName}</span>
      </div>
    );

    if (item.special) {
      return (
        <li key={item.name} className="relative">
          <button
            onClick={() => handleItemClick(item)}
            className={itemClasses}
          >
            {content}
          </button>
        </li>
      );
    }

    return (
      <li key={item.name} className="relative">
        {item.href ? (
          <Link
            to={item.href}
            className={itemClasses}
            onClick={() => handleItemClick(item)}
          >
            {content}
          </Link>
        ) : (
          <button
            onClick={() => toggleExpand(item.name)}
            className={itemClasses}
          >
            {content}
            {hasChildren && (
              isExpanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )
            )}
          </button>
        )}
        {hasChildren && isExpanded && (
          <ul className="mt-1 space-y-1">
            {item.children.map(child => renderNavigationItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul className="space-y-1">
            {items.map(item => renderNavigationItem(item))}
          </ul>
        </li>
      </ul>
    </nav>
  );
}