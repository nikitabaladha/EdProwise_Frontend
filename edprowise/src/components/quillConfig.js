// quillConfig.js
import Quill from 'quill';

// const Font = Quill.import('formats/font');
const FontStyle = Quill.import('attributors/style/font');
const Size = Quill.import('attributors/style/size');
const AlignStyle = Quill.import('attributors/style/align');
// Define which fonts you want to allow
const fontMap = [
  { name: 'sans-serif', value: 'sans-serif' },
  { name: 'arial', value: 'Arial, sans-serif' },
  { name: 'calibri', value: 'Calibri, sans-serif' },
  { name: 'comic-sans-ms', value: 'Comic Sans MS, cursive, sans-serif' },
  { name: 'courier-new', value: 'Courier New, Courier, monospace' },
  { name: 'georgia', value: 'Georgia, serif' },
  { name: 'helvetica', value: 'Helvetica, Arial, sans-serif' },
  { name: 'impact', value: 'Impact, Charcoal, sans-serif' },
  { name: 'lucida-console', value: 'Lucida Console, Monaco, monospace' },
  { name: 'tahoma', value: 'Tahoma, Geneva, sans-serif' },
  { name: 'times-new-roman', value: 'Times New Roman, Times, serif' },
  { name: 'trebuchet-ms', value: 'Trebuchet MS, Helvetica, sans-serif' },
  { name: 'verdana', value: 'Verdana, Geneva, sans-serif' },
  { name: 'serif', value: 'serif' },
  { name: 'monospace', value: 'monospace' }
];

// Configure FontStyle whitelist with just the simple names
FontStyle.whitelist = fontMap.map(font => font.value);
Quill.register(FontStyle, true);

// Font.whitelist = [
//   'sans-serif',
//   'arial', 
//   'calibri',
//   'comic-sans-ms',
//   'courier-new', 
//   'georgia',
//   'helvetica',
//   'impact', 
//   'lucida-console',
//   'tahoma',
//   'times-new-roman', 
//   'trebuchet-ms',
//   'verdana',
//   'serif',
//   'monospace'
// ];

// Register the font module with Quill
// Quill.register(Font, true);

Size.whitelist = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '28px', '36px', '48px', '72px',];
Quill.register(Size, true);

AlignStyle.whitelist = ['right', 'center', 'justify']; 

Quill.register(AlignStyle, true);

// ===== TOOLBAR CONFIGURATION =====
export const getModules = (handlers) => ({
  toolbar: {
    container: [
      [{ 
        'font': fontMap.map(font => font.value) 
      }],
      [{ 'size': Size.whitelist }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'align': AlignStyle.whitelist.concat(['']) }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video', 'attachment'],
      ['clean'],
      ['undo', 'redo']
    ],
    handlers: {
      image: handlers?.image || (() => {}),
      attachment: handlers?.attachment || (() => {})
    }
  },
  clipboard: {
    matchVisual: false
  }
});

const FontFormat = {
  name: 'font',
  format: (value) => {
    const font = fontMap.find(f => f.name === value);
    return font ? font.value : value;
  },
  parse: (value) => {
    const font = fontMap.find(f => f.value === value);
    return font ? font.name : value;
  }
};

Quill.register(FontFormat, true);

// ===== FORMATS SUPPORTED =====
export const formats = [
  'font',
  'size',
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'list', 'bullet', 'indent',
  'align',
  'link', 'image', 'video',
  
];

// ===== CSS STYLES FOR FONTS =====
export const fontStyles = `
.ql-font-sans-serif {
  font-family: Tinos, sans-serif;
}

.ql-font span[data-value="false"]::before {
  content: "Normal" ;
}
`;