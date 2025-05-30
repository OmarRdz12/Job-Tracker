
import React from 'react';
import { ApplicationProcess, Company } from '../../types';
import ApplicationItem from './ApplicationItem';
import Button from '../ui/Button';
import PlusIcon from '../ui/icons/PlusIcon';
import { IMAGES } from '@/images';

interface ApplicationListProps {
  applications: ApplicationProcess[];
  companies: Company[];
  onEdit: (application: ApplicationProcess) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications, companies, onEdit, onDelete, onAdd }) => {
  const getCompanyById = (companyId: string) => companies.find(c => c.id === companyId);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Applications</h1>
        <Button onClick={onAdd} leftIcon={<PlusIcon />}>
          Add Application
        </Button>
      </div>
      {applications.length === 0 ? (
        <div className="text-center py-10">
          <img src={IMAGES.applications} alt="No applications" className="mx-auto mb-4 rounded-lg opacity-75" />
          <p className="text-xl text-gray-500">No applications tracked yet.</p>
           <p className="text-gray-400">Click "Add Application" to record your job search progress.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map(app => (
            <ApplicationItem 
              key={app.id} 
              application={app} 
              company={getCompanyById(app.companyId)} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
