
import React from 'react';
import { ApplicationProcess, Company } from '../../types';
import Button from '../ui/Button';
import EditIcon from '../ui/icons/EditIcon';
import TrashIcon from '../ui/icons/TrashIcon';

interface ApplicationItemProps {
  application: ApplicationProcess;
  company?: Company;
  onEdit: (application: ApplicationProcess) => void;
  onDelete: (id: string) => void;
}

const ApplicationItem: React.FC<ApplicationItemProps> = ({ application, company, onEdit, onDelete }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-semibold text-primary">{application.jobTitle}</h3>
          <p className="text-md text-neutral">{company ? company.name : 'Unknown Company'}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(application)} aria-label="Edit application">
            <EditIcon />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(application.id)} aria-label="Delete application">
            <TrashIcon className="text-red-500 hover:text-red-700"/>
          </Button>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Status:</strong> <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs font-semibold rounded-full">{application.status}</span></p>
        <p><strong>Applied Date:</strong> {formatDate(application.appliedDate)}</p>
        {application.salaryExpectation && <p><strong>Salary Expectation:</strong> {application.salaryExpectation}</p>}
        {application.nextFollowUpDate && <p><strong>Next Follow-up:</strong> {formatDate(application.nextFollowUpDate)}</p>}
        {application.notes && <p className="mt-2"><strong>Notes:</strong> <span className="block whitespace-pre-wrap bg-base-200 p-2 rounded">{application.notes}</span></p>}
      </div>
    </div>
  );
};

export default ApplicationItem;
