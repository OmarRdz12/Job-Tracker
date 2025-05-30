
import React from 'react';
import { Reference, Company } from '../../types';
import ReferenceItem from './ReferenceItem';
import Button from '../ui/Button';
import PlusIcon from '../ui/icons/PlusIcon';
import { IMAGES } from '@/images';

interface ReferenceListProps {
  references: Reference[];
  companies: Company[];
  onEdit: (reference: Reference) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const ReferenceList: React.FC<ReferenceListProps> = ({ references, companies, onEdit, onDelete, onAdd }) => {
  const getCompanyById = (companyId: string) => companies.find(c => c.id === companyId);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">References</h1>
        <Button onClick={onAdd} leftIcon={<PlusIcon />}>
          Add Reference
        </Button>
      </div>
      {references.length === 0 ? (
        <div className="text-center py-10">
          <img src={IMAGES.references} alt="No references" className="mx-auto mb-4 rounded-lg opacity-75" />
          <p className="text-xl text-gray-500">No references added yet.</p>
          <p className="text-gray-400">Click "Add Reference" to keep track of your professional contacts.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {references.map(ref => (
            <ReferenceItem 
              key={ref.id} 
              reference={ref} 
              company={getCompanyById(ref.companyId)}
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReferenceList;
