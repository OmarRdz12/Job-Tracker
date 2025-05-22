
import React, { useState, useEffect } from 'react';
import { ApplicationProcess, Company, FormDataApplication, ApplicationStatus } from '../../types';
import { APPLICATION_STATUS_OPTIONS } from '../../constants';
import Modal from '../ui/Modal';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (application: ApplicationProcess) => void;
  initialData?: ApplicationProcess | null;
  companies: Company[];
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ isOpen, onClose, onSubmit, initialData, companies }) => {
  // Fix: Corrected variable name from const_initial_form_data to _initial_form_data
  const _initial_form_data: FormDataApplication = {
    companyId: '',
    jobTitle: '',
    appliedDate: new Date().toISOString().split('T')[0],
    status: ApplicationStatus.APPLIED,
    salaryExpectation: '',
    notes: '',
    nextFollowUpDate: '',
  };
  
  const [formData, setFormData] = useState<FormDataApplication>(_initial_form_data);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Fix: Use the correctly named _initial_form_data variable
      setFormData(_initial_form_data);
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyId) {
        alert("Please select a company."); // Simple validation
        return;
    }
    onSubmit({
      ...formData,
      id: initialData?.id || crypto.randomUUID(),
    });
    onClose();
  };

  const companyOptions = companies.map(c => ({ value: c.id, label: c.name }));
  
  const modalFooter = (
    <div className="flex justify-end space-x-3">
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
      <Button type="submit" form="application-form">
        {initialData ? 'Save Changes' : 'Add Application'}
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Application' : 'Add New Application'} footer={modalFooter}>
      <form id="application-form" onSubmit={handleSubmit} className="space-y-4">
        <Select label="Company" name="companyId" value={formData.companyId} onChange={handleChange} options={companyOptions} required />
        <Input label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
        <Input label="Applied Date" name="appliedDate" type="date" value={formData.appliedDate} onChange={handleChange} required />
        <Select label="Status" name="status" value={formData.status} onChange={handleChange} options={APPLICATION_STATUS_OPTIONS} required />
        <Input label="Salary Expectation" name="salaryExpectation" value={formData.salaryExpectation || ''} onChange={handleChange} placeholder="e.g., $80k-$90k or 50/hr" />
        <Input label="Next Follow-up Date" name="nextFollowUpDate" type="date" value={formData.nextFollowUpDate || ''} onChange={handleChange} />
        <Textarea label="Notes" name="notes" value={formData.notes || ''} onChange={handleChange} />
      </form>
    </Modal>
  );
};

export default ApplicationForm;