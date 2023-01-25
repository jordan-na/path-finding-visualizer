const setValue = (key, value) => {
   localStorage.setItem(key, JSON.stringify(value));
};

const getValue = (key) => {
   const val = localStorage.getItem(key);
   return val && JSON.parse(val);
};

const Storage = {
   setValue: setValue,
   getValue: getValue
};

export default Storage;