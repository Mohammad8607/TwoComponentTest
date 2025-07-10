import './App.css'
import { DataTableDemo } from './components/DataTableDemo'

import Combined from './components/Combined'

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { ChartPieInteractive } from '@/components/InteractivePieChart';

function App() {
  const [selectedView, setSelectedView] = useState("datatable")

  return (
    <div className="App p-6">
      <div className="mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-48 justify-between">
              {selectedView === "datatable"
                ? "DataTableDemo"
                : selectedView === "chart"
                  ? "ChartPieInteractive"
                  : "Combined"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white shadow-lg rounded-md border border-gray-200">
          <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-100 px-4 py-2"
          onClick={() => setSelectedView("datatable")}
          >
            DataTableDemo
          </DropdownMenuItem>
          <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-100 px-4 py-2"
          onClick={() => setSelectedView("chart")}
          >
            ChartPieInteractive
          </DropdownMenuItem>

          <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-100 px-4 py-2"
          onClick={() => setSelectedView("combined")}
          >
            Combined
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="mt-6">
        {selectedView === "datatable" && <DataTableDemo />}
        {selectedView === "chart" && <ChartPieInteractive />}
        {selectedView === "combined"&& <Combined />}
      </div>
    </div>

  )
}

export default App
