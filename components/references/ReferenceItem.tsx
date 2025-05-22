
import React from 'react';
import { Reference, Company } from '../../types';
import Button from '../ui/Button';
import EditIcon from '../ui/icons/EditIcon';
import TrashIcon from '../ui/icons/TrashIcon';

interface ReferenceItemProps {
  reference: Reference;
  company?: Company;
  onEdit: (reference: Reference) => void;
  onDelete: (id: string) => void;
}

const ReferenceItem: React.FC<ReferenceItemProps> = ({ reference, company, onEdit, onDelete }) => {
  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-semibold text-primary">{reference.name}</h3>
          <p className="text-md text-neutral">{reference.relationship}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(reference)} aria-label="Edit reference">
            <EditIcon />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(reference.id)} aria-label="Delete reference">
            <TrashIcon className="text-red-500 hover:text-red-700" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Contact:</strong> {reference.contactInfo}</p>
        {company && <p><strong>Associated Company:</strong> {company.name}</p>}
        {reference.notes && <p className="mt-2"><strong>Notes:</strong> <span className="block whitespace-pre-wrap bg-base-200 p-2 rounded">{reference.notes}</span></p>}
      </div>
    </div>
  );
};

export default ReferenceItem;
