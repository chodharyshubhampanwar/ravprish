import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  homeHref?: string;
  showHomeIcon?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  separator = <ChevronRight className="h-4 w-4 text-gray-500" />,
  homeHref = "/",
  showHomeIcon = true,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="flex items-center space-x-2">
        {showHomeIcon && (
          <li>
            <a
              href={homeHref}
              className="flex items-center text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </a>
          </li>
        )}

        {showHomeIcon && items.length > 0 && (
          <li className="flex items-center">{separator}</li>
        )}

        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <li>
              {item.href ? (
                <a
                  href={item.href}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </a>
              ) : (
                <span className="flex items-center space-x-2 text-sm font-medium text-gray-900">
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
            {index < items.length - 1 && (
              <li className="flex items-center">{separator}</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
