// load the function on page load
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

        // respone data 
        var resTxt = xmlhttp.responseText;
        // JSON data
        var resJson = JSON.parse(resTxt);
        // get th id of the div
        var myTableDiv = document.getElementById("reportsTable");
        // create table
        var table = document.createElement('table');
        // class for table
        table.className = 'divCss';
        
        var tableBody = document.createElement('tbody');
        table.appendChild(tableBody);

        // create My Sales header
        var tr = document.createElement('tr');
        tableBody.appendChild(tr);
        var td = document.createElement('td');
        td.width='100';
        td.setAttribute("nowrap",true);
        td.setAttribute("colSpan","14");
        td.appendChild(document.createTextNode('My Sales For The Month'));
        td.style.whiteSpace ='nowrap';
        td.setAttribute("align","center");
        td.className = "mySales";
        tr.appendChild(td);    

        // create table header
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

        // create row for json data
        for (var i=0; i< resJson.data.length; i++){
            var tr = document.createElement('tr');
            // alternate background color
            if(i % 2 == 0)
                tr.style.background='#eaeaea';
            else
                tr.style.background='white';
            tr.className = "data";
            tableBody.appendChild(tr);

            // add each cell data with in the row
            for (var j=0; j<resJson.data[0].length; j++){
                var td = document.createElement('td');
                td.width='75';
                // if column is 13 - % Attian, check % value for putting background color
                //Green is > 100%
                //Yellow is 95-100%
                //Red is < 95% 
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
                if(j == 0){ // for first column add image based on % Attain value
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
                     // Set image size
                     img.setAttribute("height","15px");
                     img.setAttribute("width","15px");
                     td.appendChild(img);
                }
                //add text node
                td.appendChild(document.createTextNode(resJson.data[i][j]));
                td.style.whiteSpace ='nowrap';
                // align right
                if(!(j == 0 || j == 1))
                    td.setAttribute("align","right");
                tr.appendChild(td);
            }
        }
        myTableDiv.appendChild(table);
      }
    }
    // Ajax call to get json data
    xmlhttp.open("GET","http://localhost:8080/att/json/sales.json",true);
    xmlhttp.send();
}

// set column for hide and display - column 1 is displayed and hidden depends on radio button action
function setCol(){
    if(document.fTable.timePeriod[1].checked == true)
        show_hide_column(1, false);        
    else
        show_hide_column(1, true);
}

// get table id and tr tags and hide/display all column 1 elements of all rows
function show_hide_column(col_no, do_show) {
    var stl;
    if(do_show) 
        stl = 'block'
    else         
        stl = 'none';
    var tbl  = document.getElementById('reportsTable');
    var rows = tbl.getElementsByTagName('tr');
    for (var row=1; row<rows.length;row++) {
      var cels = rows[row].getElementsByTagName('td');    
      cels[1].style.display=stl;
    }
}