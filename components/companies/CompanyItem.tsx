
import React from 'react';
import { Company } from '../../types';
import Button from '../ui/Button';
import EditIcon from '../ui/icons/EditIcon';
import TrashIcon from '../ui/icons/TrashIcon';
import ExternalLinkIcon from '../ui/icons/ExternalLinkIcon';

interface CompanyItemProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

const CompanyItem: React.FC<CompanyItemProps> = ({ company, onEdit, onDelete }) => {
  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-2xl font-semibold text-primary">{company.name}</h3>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(company)} aria-label="Edit company">
            <EditIcon />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(company.id)} aria-label="Delete company">
            <TrashIcon className="text-red-500 hover:text-red-700" />
          </Button>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <strong>Website:</strong> 
          <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer" className="ml-1 text-accent hover:underline inline-flex items-center">
            {company.websiteUrl} <ExternalLinkIcon className="ml-1" />
          </a>
        </p>
        <p>
          <strong>Job Post:</strong> 
          <a href={company.jobPostUrl} target="_blank" rel="noopener noreferrer" className="ml-1 text-accent hover:underline inline-flex items-center">
            {company.jobPostUrl} <ExternalLinkIcon className="ml-1" />
          </a>
        </p>
        {company.technologies.length > 0 && (
          <p><strong>Technologies:</strong> {company.technologies.join(', ')}</p>
        )}
        {company.recruiterName && <p><strong>Recruiter:</strong> {company.recruiterName}</p>}
        {company.recruiterEmail && <p><strong>Recruiter Email:</strong> {company.recruiterEmail}</p>}
        {company.recruiterPhone && <p><strong>Recruiter Phone:</strong> {company.recruiterPhone}</p>}
        {company.notes && <p className="mt-2"><strong>Notes:</strong> <span className="block whitespace-pre-wrap bg-base-200 p-2 rounded">{company.notes}</span></p>}
      </div>
    </div>
  );
};

export default CompanyItem;
