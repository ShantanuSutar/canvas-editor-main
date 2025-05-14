# Using EditorRef API

This example demonstrates how to use the EditorRef API to interact with variables and elements in the canvas-editor.

## Basic Usage

```javascript
import Editor, { createEditorRef } from '@hufe921/canvas-editor';

// Create editor instance
const container = document.getElementById('editor');
const editor = new Editor(container, [], { width: 800, height: 600 });

// Access the editor reference from the instance
const editorRef = editor.editorRef;

// Register a click handler for any element
const removeElementHandler = editorRef.registerElementClickHandler((element) => {
  console.log('Element clicked:', element);
});

// Register a click handler for variables
const removeVariableHandler = editorRef.registerVariableClickHandler((element, variableName, value) => {
  console.log(`Variable clicked: ${variableName} = ${value}`);
  
  // You can handle dynamic variable values here
  // For example, showing a dialog to update the variable
  const newValue = prompt(`Enter new value for ${variableName}:`, value);
  if (newValue) {
    // Update your application state with the new value
    window.mappedVariables = window.mappedVariables || {};
    window.mappedVariables[variableName] = newValue;
    
    // You could refresh or re-render the editor if needed
    const draw = editorRef.getDrawInstance();
    if (draw) {
      draw.render();
    }
  }
});

// Get a variable value by name
function getVariableValue(name) {
  return editorRef.getVariableValueByName(name);
}

// Clean up handlers when done
function cleanup() {
  removeElementHandler();
  removeVariableHandler();
}
```

## Creating EditorRef Directly

You can also create the EditorRef separately if you need to:

```javascript
import Editor, { createEditorRef } from '@hufe921/canvas-editor';

// Create editor instance
const container = document.getElementById('editor');
const editor = new Editor(container, [], { width: 800, height: 600 });

// Create editor reference directly
// This is equivalent to using editor.editorRef
const editorRef = createEditorRef(editor.command.adapt.draw);

// Use the editorRef as shown in the earlier example
```

## Advanced Usage: Integration with External Systems

```javascript
import Editor from '@hufe921/canvas-editor';

// Create editor instance
const container = document.getElementById('editor');
const editor = new Editor(container, [], { width: 800, height: 600 });

// Set up mapped variables from an external system
window.mappedVariables = {
  'customer.name': 'John Doe',
  'customer.email': 'john@example.com',
  'order.id': 'ORD-12345',
  'order.date': '2023-05-15'
};

// Register handlers
editor.editorRef.registerVariableClickHandler((element, variableName, value) => {
  // Integrate with an external form or system
  document.dispatchEvent(new CustomEvent('variable-click', {
    detail: { element, variableName, value }
  }));
});

// Handle form submission from external system
document.addEventListener('form-submit', (event) => {
  const { variables } = event.detail;
  
  // Update mapped variables
  Object.assign(window.mappedVariables, variables);
  
  // Refresh the editor view
  editor.command.executeRender();
});
```

This example demonstrates how to use the EditorRef API to create interactive documents with variables that can be updated through user interaction. 