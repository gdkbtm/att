function loadTable()
{
    var xmlhttp;

    var attain;
    
    if (window.XMLHttpRequest){
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {
    // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){      
    if (xmlhttp.readyState==4 && xmlhttp.status==200){        

        var resTxt = xmlhttp.responseText;

        var resJson = JSON.parse(resTxt);

        var x = resJson.data[0];
      //  alert(resJson.data[0].length);
        var myTableDiv = document.getElementById("reportsTable");

        var table = document.createElement('table');
        table.className = 'divCss';
       // table.border='2px solid black';

        var tableBody = document.createElement('tbody');
        table.appendChild(tableBody);

        var tr = document.createElement('tr');
        tableBody.appendChild(tr);

    //   for (var i=0; i<resJson.headers.length/3; i++){
            var td = document.createElement('td');
            td.width='100';
            td.setAttribute("nowrap",true);
            td.setAttribute("colSpan","14");
            td.appendChild(document.createTextNode('My Sales For The Month'));
            td.style.whiteSpace ='nowrap';
            td.setAttribute("align","center");
            td.className = "mySales";
            tr.appendChild(td);
      //  }

        tr = document.createElement('tr');
        tableBody.appendChild(tr);

        for (var i=0; i<resJson.headers.length; i++){
            var td = document.createElement('td');
            td.width='100';
            td.setAttribute("nowrap",true);
            td.appendChild(document.createTextNode(resJson.headers[i]));
            td.style.whiteSpace ='nowrap';
            td.className = "header";
            tr.appendChild(td);
        }

        for (var i=0; i< resJson.data.length; i++){
            var tr = document.createElement('tr');
            if(i % 2 == 0)
                tr.style.background='#eaeaea';
            else
                tr.style.background='white';
            tr.className = "data";
            tableBody.appendChild(tr);

            for (var j=0; j<resJson.data[0].length; j++){
                var td = document.createElement('td');
                td.width='75';
                if(j == 13){
                    attain = resJson.data[i][j];
                    attain = attain.trim();
                    attain = attain.substring(0, attain.length - 1);
                  //  alert(attain);
                    if(parseInt(attain) > 100){
                        td.className = "GREEN";
                    }
                    else
                    if(parseInt(attain) >= 95){
                        td.className = "YELLOW";
                    }
                    else{                       
                        td.className = "RED";
                    }
                }
                else
                if(j == 0){
                    attain = resJson.data[i][13];
                    attain = attain.trim();
                    attain = attain.substring(0, attain.length - 1);
                     var img = document.createElement("img");
                     if(parseInt(attain) > 100)
                        img.setAttribute("src","images/iconGreenArrowUp.png");
                     else
                     if(parseInt(attain) >= 95)
                         img.setAttribute("src","images/iconYellowArrowRt.png");
                     else
                     if(parseInt(attain) < 95)
                        img.setAttribute("src","images/iconRedArrowDown.png");
                     img.setAttribute("height","15px");
                     img.setAttribute("width","15px");
                     td.appendChild(img);
                }
                td.appendChild(document.createTextNode(resJson.data[i][j]));
                td.style.whiteSpace ='nowrap';
                if(!(j == 0 || j == 1))
                    td.setAttribute("align","right");
                tr.appendChild(td);
            }
        }
        myTableDiv.appendChild(table);
      }
    }
    xmlhttp.open("GET","http://localhost:8080/att/json/sales.json",true);
    xmlhttp.send();
}
function setCol(){
  //  alert(document.fTable.timePeriod[0].checked)
    if(document.fTable.timePeriod[1].checked == true)
        show_hide_column(1, false);        
    else
        show_hide_column(1, true);
}

function show_hide_column(col_no, do_show) {
    var stl;
    if (do_show) stl = 'block'
    else         stl = 'none';
    var tbl  = document.getElementById('reportsTable');
    var rows = tbl.getElementsByTagName('tr');
   // alert(rows.length);
    for (var row=1; row<rows.length;row++) {
      var cels = rows[row].getElementsByTagName('td');
    //  alert(cels[1].);
      cels[1].style.display=stl;
    }
}