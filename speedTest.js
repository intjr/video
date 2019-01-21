(function() {
  fetch('https://mdss.cloud/user/lookingglass').then(x => x.text()).then(s => {
    var dom =  s.slice(s.indexOf('<table'),s.indexOf('/table>')+'/table>'.length);
    var q = document.createElement('div');
    q.innerHTML = dom;
    q.style = 'display:none';
    document.body.appendChild(q);
    const url = 'https://ipinfo.io/json?token=c8d146b4ebffc9';
  fetch(url).then(resp=>resp.json()).then(x=>{
    let carriers = '移动';
    if (x.org.toLocaleLowerCase().indexOf('telecom') > -1) {
      carriers = '电信'
    } else if (x.org.toLocaleLowerCase().indexOf('unicom') > -1) {
      carriers = '联通'
    } else if (x.org.toLocaleLowerCase().indexOf('china mobile') > -1) {
      carriers = '移动'
    }
    /*获取最快速度的节点*/
    //1得到table
    const table = document.querySelector('table');
    const rows = table.rows;
    const titles = [{
      index: 0,
      name: rows[0].cells[0].innerText
    }];
    [].forEach.call(rows[0].cells, (col,index,arr)=>{
      if (col.innerText.indexOf(carriers) > -1) {
        titles.push({
          index: index,
          name: col.innerText
        });
      }
    }
    );
    let results = [];
    for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
      results.push(Object.assign({}, ...(titles.map(e=>{
        const r = {};
        r[e.name] = rows[rowIndex].cells[e.index].innerText;
        return r;
      }
      ))));
    }
    let msgs = [];
    titles.forEach(function(i) {
      results = results.sort((x,y)=>(i.name.indexOf('延迟') == -1 ? 1 : -1) * (-parseFloat(x[i.name]) + parseFloat(y[i.name])));
      //msgs.push([col,results[0]]);
      console.log(i.name, results.filter((a,b,c)=>b < 7));
      var r = document.createElement('div');
      r.innerText = i.name + JSON.stringify(results);
      document.body.appendChild(r);
    });
    //alert(msgs.map(e => e[0] + JSON.stringify(e[1])).join('\r\n'));
  }
  );
    
  }
  );
  
}
)();
