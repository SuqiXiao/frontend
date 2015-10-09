<?php

// put your code here
if (isset($_POST['Twiki'])) {
    $twikiURL = $_POST['Twiki'];


    if (!filter_var($twikiURL, FILTER_VALIDATE_URL)) {
        echo "TWiki URL is not valid please enter valid URL";
        return FALSE;
        die();
    }

    // Create HTTP agent. We will use this to parse the Twiki page
    // We are page scraping the twiki page using a DOM parser
    $opts = array(
        'http' => array
            ('user_agent' => 'PHP libxml agent',)
    );

    $context = stream_context_create($opts);
    libxml_set_streams_context($context);

    // This is a way to load the Twiki page through
    // a DOM parser. We use @ before $dom to avoid
    // showing errors. The Twiki is notorious for bad
    // HTML formating

    $twikiDom = new DomDocument;
    if (!@$twikiDom->loadHTMLFile($twikiURL)) {
        echo "Could not load Twiki page into Parser " . $twikiURL . "<br>";
        return FALSE;
    }

    // We will start with the looking for the <tw> tag 
    // then look for each data using <td>. The first <td>
    // is the name of the field the second is the value
    $xpath = new DOMXPath($twikiDom);
    $nodes = $xpath->query('//a/@href');
    foreach ($nodes as $href) {
        //echo $href->nodeValue;                       // echo current attribute value
        //$href->nodeValue = 'new value';              // set new attribute value
        $href->parentNode->removeAttribute('href');  // remove attribute
    }

    $rows = $twikiDom->getElementsByTagName('tr');
    if ($rows->length == 0) {
        // Seems like there is no row.
        // Did we even load a Twiki page?
        echo "Is " . $twikiURL . " a twiki page? <br>";
        return FALSE;
    }


    //Create a DOM for outputing HTML Table, This if for debugging
    $outputDom = new DomDocument;
    $root = $outputDom->createElement('html');
    $root = $outputDom->appendChild($root);

    $body = $outputDom->createElement('body');
    $body = $root->appendChild($body);

    $table = $outputDom->createElement('table');
    $table = $body->appendChild($table);

    $tbody = $outputDom->createElement('tbody');
    $tbody = $table->appendChild($tbody);

    foreach ($rows as $row) {
        $tds = $row->getElementsByTagName('td');
        if ($tds->length == 2) {
            //   if(!$_POST['Field']){  // No Field specified in POST print everything
            $showValue = TRUE;
            //   } elseif($_POST['Field'] == trim($tds->item(0)->nodeValue)) {
            //       $showValue = TRUE;
            //   }else{
            //       $showValue = FALSE;
            //   }

            if ($showValue) {
                // Fill out the array for JSON objects
                $rtn_array[trim($tds->item(0)->nodeValue)] = trim($tds->item(1)->nodeValue);

                // Fill up the table for debugging
                $tr = $outputDom->createElement('tr');
                $tr = $table->appendChild($tr);

                $th = $outputDom->createElement('th');
                $th = $tr->appendChild($th);
                $vh = $outputDom->createTextNode($tds->item(0)->nodeValue);
                $th->appendChild($vh);

                $td = $outputDom->createElement('td');
                $td = $tr->appendChild($td);
                $vd = $outputDom->createTextNode($tds->item(1)->nodeValue);
                $td->appendChild($vd);
            }
        }
    }
    //echo $outputDom->saveHTML();
    echo json_encode($rtn_array);
};
//return FALSE;
?>
        
