
import React, { useState, useEffect } from 'react';
import { Company, FormDataCompany } from '../../types';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

interface CompanyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (company: Company) => void;
  initialData?: Company | null;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<FormDataCompany>({
    name: '',
    websiteUrl: '',
    jobPostUrl: '',
    technologies: '',
    recruiterName: '',
    recruiterEmail: '',
    recruiterPhone: '',
    notes: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        technologies: initialData.technologies.join(', '),
      });
    } else {
      setFormData({
        name: '',
        websiteUrl: '',
        jobPostUrl: '',
        technologies: '',
        recruiterName: '',
        recruiterEmail: '',
        recruiterPhone: '',
        notes: '',
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const technologiesArray = formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
    onSubmit({
      ...formData,
      id: initialData?.id || crypto.randomUUID(),
      technologies: technologiesArray,
    });
    onClose();
  };
  
  const modalFooter = (
    <div className="flex justify-end space-x-3">
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
      <Button type="submit" form="company-form">
        {initialData ? 'Save Changes' : 'Add Company'}
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Company' : 'Add New Company'} footer={modalFooter}>
      <form id="company-form" onSubmit={handleSubmit} className="space-y-4">
        <Input label="Company Name" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Website URL" name="websiteUrl" type="url" value={formData.websiteUrl} onChange={handleChange} required />
        <Input label="Job Post URL" name="jobPostUrl" type="url" value={formData.jobPostUrl} onChange={handleChange} required />
        <Textarea label="Technologies (comma-separated)" name="technologies" value={formData.technologies} onChange={handleChange} />
        <Input label="Recruiter Name" name="recruiterName" value={formData.recruiterName || ''} onChange={handleChange} />
        <Input label="Recruiter Email" name="recruiterEmail" type="email" value={formData.recruiterEmail || ''} onChange={handleChange} />
        <Input label="Recruiter Phone" name="recruiterPhone" type="tel" value={formData.recruiterPhone || ''} onChange={handleChange} />
        <Textarea label="Notes" name="notes" value={formData.notes || ''} onChange={handleChange} />
      </form>
    </Modal>
  );
};

export default CompanyForm;
