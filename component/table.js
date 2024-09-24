export default class TableComponent {
  constructor(container, data, options = {}) {
      this.container = container;
      this.data = data;
      this.showActions = options.showActions !== undefined ? options.showActions : true; // 默认显示操作列
      this.columnWidths = options.columnWidths || {}; // 列宽配置
      this.onView = options.onView || (() => {}); // 自定义查看回调函数
      this.onEdit = options.onEdit || (() => {}); // 自定义编辑回调函数
      this.onDelete = options.onDelete || (() => {}); // 自定义删除回调函数
      this.keyMap = options.keyMap || {}; // 键值映射，用于列标题替换
      this.table = null;
  }

  createTable() {
      const table = document.createElement('table');
      table.classList.add('custom-table');

      // 表格标题
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');

      Object.keys(this.data[0]).forEach(key => {
          const th = document.createElement('th');
          th.textContent = this.keyMap[key];

          if (this.columnWidths[key]) {
              th.style.width = this.columnWidths[key];
          }

          headerRow.appendChild(th);
      });

      if (this.showActions) {
          // 标题加操作列
          const actionTh = document.createElement('th');
          actionTh.textContent = '操作';
          headerRow.appendChild(actionTh);
      }

      thead.appendChild(headerRow);
      table.appendChild(thead);

      // 表格内容
      const tbody = document.createElement('tbody');

      this.data.forEach((data, index) => {
          const row = document.createElement('tr');

          Object.values(data).forEach((cellData, cellIndex) => {
              const td = document.createElement('td');
              td.textContent = cellData;

              const columnName = Object.keys(data)[cellIndex];
              if (this.columnWidths[columnName]) {
                  td.style.width = this.columnWidths[columnName];
              }

              row.appendChild(td);
          });

          if (this.showActions) {
              // 加按钮
              const actionTd = document.createElement('td');
              
              const viewButton = document.createElement('button');
              viewButton.textContent = '查看';
              viewButton.addEventListener('click', () => {this.viewRow(data.course_id)});

              const editButton = document.createElement('button');
              editButton.textContent = '编辑';
              editButton.addEventListener('click', () => this.editRow(data.course_id,index));

              const deleteButton = document.createElement('button');
              deleteButton.textContent = '删除';
              deleteButton.addEventListener('click', () => this.deleteRow(data.course_id,index));

              actionTd.appendChild(viewButton);
              actionTd.appendChild(editButton);
              actionTd.appendChild(deleteButton);

              row.appendChild(actionTd);
          }
          tbody.appendChild(row);
      });

      table.appendChild(tbody);
      return table;
  }

  render() {
      this.table = this.createTable();
      this.container.innerHTML = '';
      this.container.appendChild(this.table);
  }

  viewRow(id) {
      alert(`查看数据id为${id}的行`);
      this.onView(id);
  }

  editRow(id,index) {
      const newValue = prompt('输入最新值:', JSON.stringify(this.data[index]));
      if (newValue) {
          try {
              this.data[index] = JSON.parse(newValue);
              this.render();
              this.onEdit(id);
          } catch (e) {
              alert('更新失败！');
          }
      }
  }

  deleteRow(id,index) {
      if (confirm(`确定删除数据id为${id}的行?`)) {
          const deletedData = this.data.splice(index, 1);
          this.render();
          this.onDelete(id);
      }
  }
}


