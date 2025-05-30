
import React from 'react';
import { Company } from '../../types';
import CompanyItem from './CompanyItem';
import Button from '../ui/Button';
import PlusIcon from '../ui/icons/PlusIcon';
import { IMAGES } from '@/images';

interface CompanyListProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const CompanyList: React.FC<CompanyListProps> = ({ companies, onEdit, onDelete, onAdd }) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Companies</h1>
        <Button onClick={onAdd} leftIcon={<PlusIcon />}>
          Add Company
        </Button>
      </div>
      {companies.length === 0 ? (
        <div className="text-center py-10">
          <img src={IMAGES.companies} alt="No companies" className="mx-auto mb-4 rounded-lg opacity-75" />
          <p className="text-xl text-gray-500">No companies added yet.</p>
          <p className="text-gray-400">Click "Add Company" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map(company => (
            <CompanyItem key={company.id} company={company} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyList;
