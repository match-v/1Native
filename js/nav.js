// 菜单显示
const showMenu = (toggleId, navbarId, bodyId, contentId) => {
  const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId),
    content = document.getElementById(contentId);
    

  if (toggle && navbar) {
    toggle.addEventListener('click', () => {
      navbar.classList.toggle('expander');
      content.classList.toggle('leftMove');
      bodypadding.classList.toggle('left');
    });
  }
};
showMenu('nav-toggle', 'navbar', 'left', 'contents');

// 导航颜色变化 
const linkColor = document.querySelectorAll('.navLink');
function colorLink(e) {
  e.stopPropagation();//因为属性绑定事件原因，有二级菜单时要禁用冒泡
  linkColor.forEach(l => l.classList.remove('active'));
  this.classList.add('active');
}
linkColor.forEach(l => l.addEventListener('click', colorLink));

// 内容区展示
linkColor.forEach(l => l.addEventListener('click', (e) => {
  e.stopPropagation()

  const contentId = l.getAttribute('data-content');

  if(document.getElementById(contentId)){//因为属性绑定事件原因，避免点空
    const contents = document.querySelectorAll('.content');
    contents.forEach(function(content) {
        content.classList.remove('active');
    });

    document.getElementById(contentId).classList.add('active');
  }

}));



// 二级菜单显示 
const linkCollapse = document.getElementsByClassName('collapseLink');
for (let i = 0; i < linkCollapse.length; i++) {
  linkCollapse[i].addEventListener('click', function () {
    const collapseMenu = this.nextElementSibling;

    collapseMenu.classList.toggle('showCollapse');
    collapseMenu.style = 'padding-bottom:0px'
   
    const rotate = collapseMenu.previousElementSibling;
    rotate.classList.toggle('rotate'); // 图标旋转
  });
}

// 初始加载时添加悬停和点击高亮效果到所有已展开的二级菜单项
document.querySelectorAll('.collapseMenu').forEach(collapseMenu => {
  const subLinks = collapseMenu.querySelectorAll('.collapseSublink');
  subLinks.forEach(subLink => {
    subLink.addEventListener('click', function () {
      subLinks.forEach(s => s.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
