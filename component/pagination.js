export default class Pagination {
  constructor(data, pageSize, dataListId, paginationContainerId, onPageChange) {
      this.data = data;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.totalPages = Math.ceil(this.data.length / this.pageSize);
      this.dataListId = dataListId; // 数据列表容器的ID
      this.paginationContainerId = paginationContainerId; // 分页按钮容器的ID
      this.onPageChange = onPageChange; // 页码改变时的回调函数

      this.init();
  }

  init() {
      this.renderData();
      this.renderPagination();
      if (this.onPageChange) {
          this.onPageChange(this.currentPage); // 初始化时调用回调函数
      }
  }

  renderData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const pageData = this.data.slice(startIndex, endIndex);

      const dataList = document.getElementById(this.dataListId); // 使用传递的ID
      dataList.innerHTML = '';
      pageData.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          dataList.appendChild(li);
      });
  }

  renderPagination() {
      const paginationContainer = document.getElementById(this.paginationContainerId); // 使用传递的ID
      paginationContainer.innerHTML = '';

      // 上一页按钮
      const prevButton = document.createElement('button');
      prevButton.className = 'pagination-button';
      prevButton.textContent = '上一页';
      if (this.currentPage === 1) {
          prevButton.disabled = true;
      }
      prevButton.addEventListener('click', () => {
          if (this.currentPage > 1) {
              this.currentPage--;
              this.renderData();
              this.renderPagination();
              if (this.onPageChange) {
                  this.onPageChange(this.currentPage); // 页码改变时调用回调函数
              }
          }
      });
      paginationContainer.appendChild(prevButton);

      // 页码按钮
      for (let i = 1; i <= this.totalPages; i++) {
          const button = document.createElement('button');
          button.className = 'pagination-button';
          button.textContent = i;
          if (i === this.currentPage) {
              button.classList.add('active');
          }
          button.addEventListener('click', () => {
              this.currentPage = i;
              this.renderData();
              this.renderPagination();
              if (this.onPageChange) {
                  this.onPageChange(this.currentPage); // 页码改变时调用回调函数
              }
          });
          paginationContainer.appendChild(button);
      }

      // 下一页按钮
      const nextButton = document.createElement('button');
      nextButton.className = 'pagination-button';
      nextButton.textContent = '下一页';
      if (this.currentPage === this.totalPages) {
          nextButton.disabled = true;
      }
      nextButton.addEventListener('click', () => {
          if (this.currentPage < this.totalPages) {
              this.currentPage++;
              this.renderData();
              this.renderPagination();
              if (this.onPageChange) {
                  this.onPageChange(this.currentPage); // 页码改变时调用回调函数
              }
          }
      });
      paginationContainer.appendChild(nextButton);
  }
}

