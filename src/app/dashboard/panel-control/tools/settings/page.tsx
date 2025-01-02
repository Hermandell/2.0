"use client";
import { GenericTable } from "@/components/data-table/generic-table";
import { ViewSelector } from "@/components/view-switcher/view-selector";
import { useState } from "react";
import { getMockData } from "@/data/mock-data";
import { GenericDataResponse } from "@/types/data";
import { generateColumnsFromData } from "@/utils/table-utils";
const Settings = () => {
// prepar despues para que checa las vistas cargadas
  const [selectedView, setSelectedView] = useState<string>("tasks");
  const [currentData, setCurrentData] = useState<Record<string, any>[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get mock data based on selected view
      const response = getMockData(selectedView);
      
      const generatedColumns = generateColumnsFromData(response.data);
      setCurrentData(response.data);
      setColumns(generatedColumns);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

    return (
      <>
        <h2>Vistas</h2>
        <ViewSelector
        selectedView={selectedView}
        onViewChange={setSelectedView}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />
      
      {currentData.length > 0 && columns.length > 0 && (
        <GenericTable 
          data={currentData}
          columns={columns}
        />
      )}

      </>
    );
  };
  
  export default Settings;