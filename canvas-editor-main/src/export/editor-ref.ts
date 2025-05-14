import { IElement } from '../editor/interface/Element';
import { Draw } from '../editor/core/draw/Draw';
import { logElementValue } from '../editor/core/event/handlers/mousedown';

/**
 * EditorRef Interface - API for external access to the canvas editor
 */
export interface IEditorRef {
  /**
   * Register a click handler for elements
   * @param callback Function to be called when any element is clicked
   * @returns Function to unregister the handler
   */
  registerElementClickHandler: (
    callback: (element: IElement) => void
  ) => () => void;
  
  /**
   * Register a click handler for variable elements
   * @param callback Function to be called when a variable element is clicked
   * @returns Function to unregister the handler
   */
  registerVariableClickHandler: (
    callback: (element: IElement, variableName: string, value: string) => void
  ) => () => void;
  
  /**
   * Get the current value of a variable by its name
   * @param variableName The variable name (without curly braces)
   * @returns The variable value or null if not found
   */
  getVariableValueByName: (variableName: string) => string | null;
  
  /**
   * Get the last clicked element
   * @returns The last clicked element or null if no element has been clicked
   */
  getLastClickedElement: () => IElement | null;
  
  /**
   * Get the underlying Draw instance for advanced operations
   * @returns The Draw instance
   */
  getDrawInstance: () => Draw | null;
}

/**
 * Editor reference factory - creates an editor reference for external use
 */
export function createEditorRef(draw: Draw): IEditorRef {
  // Store for element click handlers
  const elementClickHandlers: Set<(element: IElement) => void> = new Set();
  
  // Store for variable click handlers
  const variableClickHandlers: Set<
    (element: IElement, variableName: string, value: string) => void
  > = new Set();
  
  // Store the last clicked element
  let lastClickedElement: IElement | null = null;
  
  // Process an element click and notify registered handlers
  const handleElementClick = (element: IElement) => {
    // Save the last clicked element
    lastClickedElement = element;
    
    // Notify general element click handlers
    elementClickHandlers.forEach(handler => {
      try {
        handler(element);
      } catch (error) {
        console.error('Error in element click handler:', error);
      }
    });
    
    // Handle variable elements
    if (element.variable && element.variableName) {
      const variableName = element.variableName.replace(/^\{\{|\}\}$/g, '');
      const value = element.value;
      
      // Notify variable click handlers
      variableClickHandlers.forEach(handler => {
        try {
          handler(element, variableName, value);
        } catch (error) {
          console.error('Error in variable click handler:', error);
        }
      });
    }
  };
  
  // Patch the logElementValue function in the CanvasEvent
  const originalLogElementValue = logElementValue;
  
  // Override the logElementValue function in the event system
  // This will be called when mousedown.ts uses logElementValue
  (draw as any)._patchedLogElementValue = (element: IElement) => {
    // Call original function
    originalLogElementValue(element);
    
    // Call our custom handler
    if (element) {
      handleElementClick(element);
    }
  };
  
  // Create and return the editor reference API
  return {
    registerElementClickHandler: (callback) => {
      elementClickHandlers.add(callback);
      return () => {
        elementClickHandlers.delete(callback);
      };
    },
    
    registerVariableClickHandler: (callback) => {
      variableClickHandlers.add(callback);
      return () => {
        variableClickHandlers.delete(callback);
      };
    },
    
    getVariableValueByName: (variableName) => {
      // Try to get from global mappedVariables if it exists
      const globalWindow = window as any;
      if (globalWindow.mappedVariables && typeof globalWindow.mappedVariables === 'object') {
        if (variableName in globalWindow.mappedVariables) {
          return globalWindow.mappedVariables[variableName];
        }
      }
      return null;
    },
    
    getLastClickedElement: () => {
      return lastClickedElement;
    },
    
    getDrawInstance: () => draw
  };
}

// Export a global type for the editor ref
export type EditorRef = IEditorRef;

export default createEditorRef; 